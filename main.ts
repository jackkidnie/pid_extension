//% color=#009999 icon="\uf06e" block="IR Sensor"
namespace IR_sensor {
    const VL53L0X_ADDR = 0x29

    //% block="initialize IR sensor"
    //% group="IR"
    export function init(): void {
        // VL53L0X boot-up and default initialization
        basic.pause(10)
        write8(0x88, 0x00)
        write8(0x80, 0x01)
        write8(0xFF, 0x01)
        write8(0x00, 0x00)
        stopContinuous()
        write8(0x80, 0x00)
        write8(0xFF, 0x00)
        write8(0x00, 0x00)
        basic.pause(10)
    }

    //% block="read IR distance in mm"
    //% group="IR"
    export function readDistance(): number {
        // VL53L0X single-shot ranging
        write8(0x00, 0x01)  // start measurement
        basic.pause(50)    // give it time
        return read16(0x14) // read result
    }

    function write8(reg: number, val: number): void {
        pins.i2cWriteBuffer(VL53L0X_ADDR, pins.createBufferFromArray([reg, val]))
    }

    function read16(reg: number): number {
        pins.i2cWriteNumber(VL53L0X_ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(VL53L0X_ADDR, NumberFormat.UInt16BE)
    }

    function stopContinuous(): void {
        write8(0x80, 0x01)
        write8(0xFF, 0x01)
        write8(0x00, 0x00)
        write8(0x91, 0x00)
        write8(0x00, 0x01)
        write8(0xFF, 0x00)
        write8(0x80, 0x00)
    }
}