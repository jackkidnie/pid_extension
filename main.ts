//% color=#009999 icon="\uf06e" block="IR Sensor"
namespace IR_sensor {
    const VL53L0X_ADDR = 0x29

    //% block="initialize IR sensor"
    //% group="IR"
    export function init(): void {
        // Minimal placeholder — real init not yet implemented
        pins.i2cWriteNumber(VL53L0X_ADDR, 0x00, NumberFormat.UInt8BE)
        basic.pause(10)
    }

    //% block="read IR distance in mm"
    //% group="IR"
    export function readDistance(): number {
        // Placeholder: tries to read result from 0x1E (not guaranteed to work)
        let raw = pins.i2cReadNumber(VL53L0X_ADDR, NumberFormat.UInt16BE)
        return raw
    }
}