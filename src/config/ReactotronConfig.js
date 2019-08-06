import Reactotron from 'reactotron-react-native'


console.disableYellowBox = true

Reactotron.configure({
  name: 'HSC',
  host: '192.168.1.79',
  port: 9090
})

Reactotron.useReactNative({
  asyncStorage: { ignore: ['secret'] }
})

if (__DEV__) {
  Reactotron.connect()
  Reactotron.clear()
}

console.tron = Reactotron