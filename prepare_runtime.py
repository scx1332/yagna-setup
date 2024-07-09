import os
from pathlib import Path

Path("/binaries/requestor").mkdir(parents=True, exist_ok=True)
Path("/binaries/provider").mkdir(parents=True, exist_ok=True)

requestor_env = open("common.env")