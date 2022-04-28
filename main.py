radio.set_group(100)

def on_received_value(answer, value):
    radio.send_string("")
radio.on_received_value(on_received_value)
control.device_serial_number()