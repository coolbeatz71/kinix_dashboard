import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style';

const AppDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default AppDatePicker;
