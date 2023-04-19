import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { COLORS } from './theme.style';
export const STYLES = {
    container: {
        flex: 1,
        backgroundColor: COLORS.gray
    },
    wellcome: {
        height: Dimensions.get('window').height / 2.5
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: COLORS.gray,
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        borderColor:COLORS.gray,
        borderWidth: 1,
        height: 470,
    },
    bottomBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.orange,
        height: 50,
        width: '60%',
        borderRadius: 30,
    },
    title: {
        fontWeight: 'bold',
        color: COLORS.orange,
        fontSize: 30,
        margin: 8,
    },
    input_form: {
        height: 45,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center',
        borderColor: COLORS.darkgray
    },
    input: {
        paddingStart: 16,
        paddingEnd: 32,
        color: COLORS.black,
        fontSize: 16,
        flex: 1,
    },
    viewCard: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 15,
      },
      viewTitle: {
        flexDirection: "row",
        alignItems: "center",
      },
      viewTitles: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical:10,
        borderRadius:20,
        borderColor:COLORS.orange,
        height:50,
        borderWidth:1,
        backgroundColor:COLORS.white
      },
      titles: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.grey,
        marginLeft: 10,
      },
}
const appTheme = {STYLES}
export default appTheme