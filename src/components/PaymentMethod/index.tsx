import { Alert, View } from "react-native";
import TextLabel from "../TextLabel";
import { Badge, TextInput } from "react-native-paper";
import { COLOR_LISTS } from "../../constants/colors";
import { useAccountContext } from "../../providers/AccountProvider";
import { useEffect, useState } from "react";
import Button from "../Button";
import DividerComponent from "../Divider";
import DocumentPicker from 'react-native-document-picker';

type proofOfPaymentProps = {
    setProofOfPayment: (param: any) => void;
};

export const PaymentMethod = (props: proofOfPaymentProps) => {
    const {setProofOfPayment} = props;

    const {activeUserInformation} = useAccountContext();
    const [fullName, setFullName] = useState<string>("");
    const [proofOfPaymentLabel, setProofOfPaymentLabel] = useState<string>("Upload proof of payment.");
    const [cashTendered, setCasheTendered] = useState<string>("400");

    const onUploadProofOfPayment = async () => {
        try {
            let document = await DocumentPicker.pick({
              type: DocumentPicker.types.images,
              allowMultiSelection: false,
            });

            setProofOfPayment(document);
            setProofOfPaymentLabel(`Uploaded ${document.length} proof of payment.`)
          } catch (error) {
           Alert.alert("Oops", "Please upload a proof of payment.");
           setProofOfPaymentLabel("Upload proof of payment.");
          }
    };

    useEffect(() => {
        setFullName(`${activeUserInformation?.account?.lastname}, ${activeUserInformation?.account?.firstname}`)
    }, [activeUserInformation]);

    return <View style={{marginTop: 10}}>
        <View style={{alignSelf: "flex-start"}}>
            <Badge style={{backgroundColor: COLOR_LISTS.AMBER_600, fontSize: 12}}>
                Payment Subscriptions
            </Badge>
        </View>
        <TextInput placeholder="Fullname" value={fullName} style={{backgroundColor: COLOR_LISTS.WHITE}} disabled />
        <TextInput placeholder="Cash Tendered." style={{backgroundColor: COLOR_LISTS.WHITE}} keyboardType="decimal-pad" value={cashTendered} disabled />
        <DividerComponent margin="10px 0 0 0" />
        <Button title={proofOfPaymentLabel} background={COLOR_LISTS.GREEN} onPress={onUploadProofOfPayment} />
    </View>
};
