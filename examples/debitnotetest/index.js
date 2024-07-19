import { GolemNetwork } from "@golem-sdk/golem-js";
import { pinoPrettyLogger } from "@golem-sdk/pino-logger";
import 'dotenv/config'

let proposalDiplayed = false;
let nodeID = "";

const debitNotesRecevied = [];

const myDebitNoteFilter = async (debitNote, context) => {
    //console.debug("Fiter: ", debitNote);
    if (debitNotesRecevied.push(debitNote.id) == 2) {
        console.log("delaying 3rd debitnote");
        await new Promise((res) => setTimeout(res, 130 * 1000));
        return true;
    }
    return true;
};

const myProposalFilter = (proposal) =>
    Boolean(proposal.provider.name.indexOf("testnet") == -1);

const subnetTag = process.env.YAGNA_SUBNET || "public";
const appKey = process.env.YAGNA_APPKEY || "66iiOdkvV29";

const order = {
    demand: {
        workload: { imageTag: "golem/alpine:latest" },
        payment: {
            debitNotesAcceptanceTimeoutSec: 125,
            midAgreementDebitNoteIntervalSec: 152,
            midAgreementPaymentTimeoutSec: 1200,
        },
        subnetTag: subnetTag,
    },
    market: {
        rentHours: 13,
        pricing: {
            model: "linear",
            maxStartPrice: 0.5,
            maxCpuPerHourPrice: 1.0,
            maxEnvPerHourPrice: 0.5,
        },
        offerProposalFilter: myProposalFilter,
    },
    activity: {
        activityExeBatchResultPollIntervalSeconds: 10,
        activityExeBatchResultMaxRetries: 20,
    },
    payment: {
        debitNoteFilter: myDebitNoteFilter,
    },
};

(async () => {
    const glm = new GolemNetwork({
        logger: pinoPrettyLogger({
            level: "info",
        }),
        api: { key: appKey },
    });

    try {
        await glm.connect();

        glm.market.events.on("agreementApproved", (event) => {
            console.log(
                "agreementApproved",
                "AT:",
                event.agreement.model.offer.properties[
                    "golem.com.payment.debit-notes.accept-timeout?"
                    ],
                "DNI:",
                event.agreement.model.offer.properties[
                    "golem.com.scheme.payu.debit-note.interval-sec?"
                    ],
                "PT:",
                event.agreement.model.offer.properties[
                    "golem.com.scheme.payu.payment-timeout-sec?"
                    ]
            );
        });
        glm.market.events.on("agreementTerminated", (event) => {
            console.log("agreementTerminated", event.agreement.id);
        });
        glm.market.events.on("offerProposalReceived", (event) => {
            if (!proposalDiplayed || nodeID == event.offerProposal.provider.id)
                console.log(
                    "offerProposalReceived",
                    "AT:",
                    event.offerProposal.properties[
                        "golem.com.payment.debit-notes.accept-timeout?"
                        ],
                    "DNI:",
                    event.offerProposal.properties[
                        "golem.com.scheme.payu.debit-note.interval-sec?"
                        ],
                    "PT:",
                    event.offerProposal.properties[
                        "golem.com.scheme.payu.payment-timeout-sec?"
                        ]
                );
            nodeID = event.offerProposal.provider.id;
            //.log(nodeID);

            proposalDiplayed = true;
        });

        glm.payment.events.on("debitNoteReceived", (event) => {
            console.log(
                "debitNoteReceived",
                event.debitNote.id,
                event.debitNote.model.timestamp,
                event.debitNote.model.paymentDueDate,
                event.debitNote.model.totalAmountDue,
                event.debitNote.model.usageCounterVector
            );
        });
        glm.payment.events.on("debitNoteAccepted", (event) => {
            console.log(
                "debitNoteAccepted",
                event.debitNote.id,
                event.debitNote.model.timestamp,
                event.debitNote.model.paymentDueDate,
                event.debitNote.model.totalAmountDue,
                event.debitNote.model.usageCounterVector
            );
        });
        glm.payment.events.on("debitNoteRejected", (event) => {
            console.log("debitNoteRejected", event);
        });
        glm.payment.events.on("errorAcceptingDebitNote", (event) => {
            console.log("errorAcceptingDebitNote", event);
        });
        glm.payment.events.on("errorRejectingDebitNote", (event) => {
            console.log(
                "errorRejectingDebitNote",
                event.debitNote.id,
                event.debitNote.model.timestamp,
                event.debitNote.model.paymentDueDate,
                event.debitNote.model.totalAmountDue,
                event.debitNote.model.usageCounterVector
            );
        });

        const rental = await glm.oneOf({ order });
        await rental
            .getExeUnit()
            .then((exe) => exe.run("sleep 600"))
            .then((res) => console.log(res.stdout));
        await rental.stopAndFinalize();
    } catch (err) {
        console.error("Failed to run the example", err);
    } finally {
        await glm.disconnect();
    }
})().catch(console.error);
