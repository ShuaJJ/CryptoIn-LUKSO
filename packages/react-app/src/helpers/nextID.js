import { ecsign, toRpcSig, keccakFromString } from 'ethereumjs-util'

async function personalSign(message: Buffer, privateKey: Buffer): Promise<Buffer> {
    const messageHash = keccakFromString(`\x19Ethereum Signed Message:\n${message.length}${message}`, 256)
    const signature = ecsign(messageHash, privateKey)
    return Buffer.from(toRpcSig(signature.v, signature.r, signature.s).slice(2), 'hex')
}

export const generateNextIDSignature = async () => {
    const message = Buffer.from('Test123123!', 'utf8');
    const secretKey = Buffer.from('9deba3488458c0314e5fef8920d3b117dd76415569cf270db8fd864896c02732', 'hex');
    const signature = await personalSign(message, secretKey);

    return '0x'+signature.toString('hex');
}