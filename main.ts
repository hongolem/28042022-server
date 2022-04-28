radio.setGroup(100)
radio.onReceivedValue(function on_received_value(answer: string, value: number) {
    radio.sendString("")
})
control.deviceSerialNumber()
