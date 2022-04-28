radio.setGroup(100)
let A = 0
let B = 0
let C = 0
let D = 0
let E = 0
radio.onReceivedValue(function on_received_value(name: string, value: number) {
    
    if (value == 65) {
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
