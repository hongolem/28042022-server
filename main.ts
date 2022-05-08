// Při zmáčknutí tlačítka A na serveru se odešle číslo 1, 
//  při kterém se u klienta povolí hlasování (možnosti od A do E), zobrazí "Start!", 
//  pošle se do serveru hodnota a z ní se vyčte sériové číslo, které se uloží do listu sériových čísel, 
//  poté se server i klient přehodí na jinou rádiovou skupinu (101) a server klientovi pošle zprávu o příjmutí 
//  a oba microbity se znovu přehodí na původní rádio skupinu (100).
// Do té doby, pokud zmáčkne tlačítko nebo pin, tak se zobrazí "Hlasování nezačalo!".
// Hlasování jde vynulovat pomocí zmáčknutí loga, ale hlasování se neukončí.
// Zmáčknutím tlačítka B na serveru se odešle číslo 0, které na klientovi zobrazí "End!" a uzamkne hlasování 
//  a určí hodnotu odpovědi (64-69 od "", "A" až po "E") na základě jaká je proměnná Decision 
//  a danná odpověď se odešle pod proměnnou 'Answer' s jménem value "answer".
// V serveru se přičtou body podle příjmuté hodnoty (64-69) k jednotlivým proměnným, 
//  které se po půl sekundové pauze (kvůli jistotě započtení všech hlasů), printnou do konzole.
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
    basic.pause(500)
    console.log("Pro možnost A hlasovalo " + A + " lidí.")
    console.log("Pro možnost B hlasovalo " + B + " lidí.")
    console.log("Pro možnost C hlasovalo " + C + " lidí.")
    console.log("Pro možnost D hlasovalo " + D + " lidí.")
    console.log("Pro možnost E hlasovalo " + E + " lidí.")
    console.log("Nehlasovalo " + Bez_odpovědi + " lidí.")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_event_pressed() {
    
    Bez_odpovědi = 0
    A = 0
    B = 0
    C = 0
    D = 0
    E = 0
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
