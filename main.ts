radio.setGroup(100)
let Serial_numbers = [0]
let Bez_odpovědi = 0
let A = 0
let B = 0
let C = 0
let D = 0
let E = 0
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    radio.sendNumber(0)
    console.log("Pro možnost A hlasovalo " + A + " lidí.")
    console.log("Pro možnost B hlasovalo " + B + " lidí.")
    console.log("Pro možnost C hlasovalo " + C + " lidí.")
    console.log("Pro možnost D hlasovalo " + D + " lidí.")
    console.log("Pro možnost E hlasovalo " + E + " lidí.")
    console.log("Nehlasovalo " + Bez_odpovědi + " lidí.")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
    let Bez_odpovědi = 0
    let A = 0
    let B = 0
    let C = 0
    let D = 0
    let E = 0
})
radio.onReceivedValue(function on_received_value2(serial_number: string, value: number) {
    
    Serial_numbers.push(radio.receivedPacket(RadioPacketProperty.SerialNumber))
    radio.setGroup(101)
    radio.sendString("Napojeno se serverem!")
    radio.setGroup(100)
})
radio.onReceivedValue(function on_received_value(answer: string, value: number) {
    
    if (value == 64) {
        Bez_odpovědi += 1
    } else if (value == 65) {
        A += 1
    } else if (value == 66) {
        B += 1
    } else if (value == 67) {
        C += 1
    } else if (value == 68) {
        D += 1
    } else if (value == 69) {
        E += 1
    }
    
})
