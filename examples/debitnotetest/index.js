import {GolemNetwork} from "@golem-sdk/golem-js";
import {pinoPrettyLogger} from "@golem-sdk/pino-logger";
import 'dotenv/config'

let proposalDisplayed = false;
let nodeID = "";

const debitNotesReceived = [];


const lostDebitNotes = [2, 3];

const myDebitNoteFilter = async (debitNote, context) => {
    let debitNo = debitNotesReceived.push(debitNote.id);

    if (lostDebitNotes.includes(debitNo)) {
        console.log(`delaying debit note no ${debitNo}`);
        await new Promise((res) => setTimeout(res, 130 * 1000));
        return true;
    }
    return true;
};

const getTimeStamp = () => {
    return (
        "[" + new Date().toISOString().split("T").pop().split("Z").shift() + "]"
    );
};
const myProposalFilter = (proposal) =>
    Boolean(proposal.provider.name.indexOf("testnet") == -1);

const subnetTag = process.env.YAGNA_SUBNET || "public";
const appKey = process.env.YAGNA_APPKEY || "66iiOdkvV29";
const debitNoteTimeout = parseInt(process.env.DEBIT_NOTE_TIMEOUT || "10");
const debitNoteInterval = parseInt(process.env.DEBIT_NOTE_INTERVAL || "15");
const order = {
    demand: {
        workload: {imageTag: "golem/alpine:latest"},
        payment: {
            debitNotesAcceptanceTimeoutSec: debitNoteTimeout,
            midAgreementDebitNoteIntervalSec: debitNoteInterval,
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
        api: {key: appKey},
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
            if (!proposalDisplayed || nodeID == event.offerProposal.provider.id)
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

            proposalDisplayed = true;
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

        const rental = await glm.oneOf({order});

        const exe = await rental.getExeUnit();
        console.log(`Got exeUnit: ${getTimeStamp()}`);

        await exe.run("echo Hello, Golem!");

        console.log(
            "Started testing provider %s",
            exe.provider.name
        );

        await exe.run("sleep 30");
        console.log("Step 1 finished");
        await exe.run("sleep 30");
        console.log("Step 2 finished");
        await exe.run("sleep 30");
        console.log("Step 3 finished");
        await exe.run("sleep 30");
        console.log("Step 4 finished");
        await exe.run("sleep 30");
        console.log("Step 5 finished");
        await exe.run("sleep 30");
        console.log("Step 6 finished");
        await exe.run("sleep 30");
        console.log("Step 7 finished");
        await exe.run("sleep 30");
        console.log("Step 8 finished");
        await exe.run("sleep 30");
        console.log("Step 9 finished");
        await exe.run("sleep 30");
        console.log("Step 10 finished");

        console.log(
            "Finished testing on provider %s",
            exe.provider.name
        );
        await rental.stopAndFinalize();
    } catch (err) {
        console.error("Failed to run the example", err);
    } finally {
        await glm.disconnect();
    }
})().catch(console.error);
