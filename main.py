radio.set_group(100)

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
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_received_value(name, value):
    global A, B, C, D, E
    if value == 65:
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
