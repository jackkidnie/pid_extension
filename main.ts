//% color=#009999 icon="\uf06e" block="IR Sensor"
namespace IR_sensor {
    const VL53L0X_ADDR = 0x29;

    //% block="initialize IR sensor"
    //% group="IR"
    export function init(): void {
        // Required startup sequence to make the VL53L0X respond
        write8(0x88, 0x00)
        write8(0x80, 0x01)
        write8(0xFF, 0x01)
        write8(0x00, 0x00)
        write8(0x91, 0x3C)
        write8(0x00, 0x01)
        write8(0xFF, 0x00)
        write8(0x80, 0x00)
        basic.pause(50)
    }

    //% block="read IR distance in mm"
    //% group="IR"
    export function readDistance(): number {
        // Start a single measurement
        write8(0x00, 0x01)
        basic.pause(50)

        // Read result from 0x14
        return read16(0x14)
    }

    function write8(reg: number, val: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = val
        pins.i2cWriteBuffer(VL53L0X_ADDR, buf)
    }

    function read16(reg: number): number {
        pins.i2cWriteNumber(VL53L0X_ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(VL53L0X_ADDR, NumberFormat.UInt16BE)
    }
}