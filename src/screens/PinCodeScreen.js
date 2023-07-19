import React from 'react';
import SimplePin from 'react-native-simple-pin'
import { Alert } from 'react-native'

const PinCodeScreen = ({navigation}) => (
    <SimplePin
        pin={[1,2,3,4]}
        title="결제 비밀번호 입력"
        onSuccess={() => navigation.navigate("stackReservation")}
        onFailure={() => Alert.alert(
            '비밀번호 오류',
            '다시 시도해 주세요',
            [
                { text: 'OK' },
            ]
        )}
        titleStyle={{ fontSize: 23 }}
        numpadTextStyle={{ fontSize: 27 }}
        bulletStyle={{fontSize:25}}
    />
)

export default PinCodeScreen;