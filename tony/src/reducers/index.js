import app from './app';
import auth from './auth';
import version from './version';
import project from './project';
import dashboardOptions from './dashboardOptions';
import simulation from './simulation';

import { reducer as idfEditor } from '../modules/IdfEditor';
import { reducer as projects } from '../modules/Projects';
import { reducer as views } from '../modules/Views';
import { reducer as charts } from '../modules/Charts';
import { reducer as simulators } from '../modules/Simulators';
import { reducer as simulatorResults } from '../modules/SimulatiorResults';
import { reducer as chartEditor} from '../modules/ChartEditor';

export default {
  app,
  auth,
  version,
  idfEditor,
  projects,
  views,
  project,
  simulation,
  dashboardOptions,
  charts,
  simulators,
  simulatorResults,
  chartEditor,
};
