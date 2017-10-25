import { SET_API_DATA } from './actions'

const apiDataReducer = (apiData = {}, {type, apiData: newAPIData}) => type === SET_API_DATA ? newAPIData : apiData
export default apiDataReducer 