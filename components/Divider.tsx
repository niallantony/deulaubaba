import { LightText } from './ThemedText';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/themes/global';

export const DividerWithTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.view}>
      <LightText>{title}</LightText>
      <View style={[styles.divider, { marginLeft: 12 }]} />
    </View>
  )
}

export const Divider = () => {
  return (<View style={[styles.divider, { marginVertical: 12, backgroundColor: theme.colors.subtle }]} />)

}

const styles = StyleSheet.create({
  view: {
    marginTop: 24,
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    flex: 1,
    backgroundColor: theme.colors.light,
  }
})


