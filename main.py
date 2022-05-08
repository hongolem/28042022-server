#Při zmáčknutí tlačítka A na serveru se odešle číslo 1, 
# při kterém se u klienta povolí hlasování (možnosti od A do E), zobrazí "Start!", 
# pošle se do serveru hodnota a z ní se vyčte sériové číslo, které se uloží do listu sériových čísel, 
# poté se server i klient přehodí na jinou rádiovou skupinu (101) a server klientovi pošle zprávu o příjmutí 
# a oba microbity se znovu přehodí na původní rádio skupinu (100).
#Do té doby, pokud zmáčkne tlačítko nebo pin, tak se zobrazí "Hlasování nezačalo!".
#Hlasování jde vynulovat pomocí zmáčknutí loga, ale hlasování se neukončí.
#Zmáčknutím tlačítka B na serveru se odešle číslo 0, které na klientovi zobrazí "End!" a uzamkne hlasování 
# a určí hodnotu odpovědi (64-69 od "", "A" až po "E") na základě jaká je proměnná Decision 
# a danná odpověď se odešle pod proměnnou 'Answer' s jménem value "answer".
#V serveru se přičtou body podle příjmuté hodnoty (64-69) k jednotlivým proměnným, 
# které se po půl sekundové pauze (kvůli jistotě započtení všech hlasů), printnou do konzole.

radio.set_group(100)

Serial_numbers = [0,]
Bez_odpovědi = 0
A = 0
B = 0
C = 0
D = 0
E = 0

def on_button_pressed_a():
    radio.send_number(1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    radio.send_number(0)
    basic.pause(500)
    print("Pro možnost A hlasovalo " + A + " lidí.")
    print("Pro možnost B hlasovalo " + B + " lidí.")
    print("Pro možnost C hlasovalo " + C + " lidí.")
    print("Pro možnost D hlasovalo " + D + " lidí.")
    print("Pro možnost E hlasovalo " + E + " lidí.")
    print("Nehlasovalo " + Bez_odpovědi + " lidí.")
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_logo_event_pressed():
    Bez_odpovědi = 0
    A = 0
    B = 0
    C = 0
    D = 0
    E = 0
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_event_pressed)

def on_received_value2(serial_number, value):
    global Serial_numbers
    Serial_numbers.append(radio.received_packet(RadioPacketProperty.SERIAL_NUMBER))
    radio.set_group(101)
    radio.send_string("Napojeno se serverem!")
    radio.set_group(100)
radio.on_received_value(on_received_value2)

def on_received_value(answer, value):
    global Bez_odpovědi, A, B, C, D, E
    if value == 64:
        Bez_odpovědi += 1
    elif value == 65:
        A += 1
    elif value == 66:
        B += 1
    elif value == 67:
        C += 1
    elif value == 68:
        D += 1
    elif value == 69:
        E += 1
radio.on_received_value(on_received_value)