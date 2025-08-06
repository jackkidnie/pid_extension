//% block="read ultrasonic distance in cm"
//% group="Sensors"
namespace sensors {
    /**
     * Reads distance using ultrasonic sensor on P1 (Trig) and P2 (Echo)
     * Returns distance in cm
     */
    //% block
    export function readUltrasonicPID(): number {
        pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P1, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P1, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P1, 0);

        const duration = pins.pulseIn(DigitalPin.P2, PulseValue.High, 23000);
        const distance = duration * 0.0343 / 2;
        return Math.round(distance);
    }
}