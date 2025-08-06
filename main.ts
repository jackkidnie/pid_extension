//% block="read ultrasonic distance in cm"
//% group="Sensors"
namespace sensors {
    export function readUltrasonic(): number {
        // P1 = Trigger, P2 = Echo
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P1, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P1, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P1, 0);

        const duration = pins.pulseIn(DigitalPin.P2, PulseValue.High, 23000); // timeout ~400cm
        const distance = duration * 0.0343 / 2;
        return Math.round(distance); // return in cm
    }
}