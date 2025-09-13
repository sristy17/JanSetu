import { View, Text, Button } from 'react-native'
import { supabase } from '../../libs/supabase'

export default function HomePage() {
  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome Home </Text>
      <Button title="Logout" onPress={signOut} />
    </View>
  )
}
