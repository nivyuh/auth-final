import {Button,Text,View} from "react-native";

export default function Settings(){
    return (
        <View>
            <Text> Settings</Text>
            <Button title="Sign Out" onPress={async () => await signOut(auth)} />
        </View>
    )
}