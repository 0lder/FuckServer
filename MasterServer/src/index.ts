
import { MasterService } from "./app/core/MasterService";
import { MASTER_CONFIG } from "./common/const/Const";

MasterService.inst.start(MASTER_CONFIG.PORT);