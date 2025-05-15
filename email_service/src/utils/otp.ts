class OTPService {
    private otpStore: Map<string, { otp: string; expirationTime: number }>;

    constructor() {
        this.otpStore = new Map<string, {
            otp: string;
            expirationTime: number;
        }>();
    }

    /**
     * Generates a 6-digit OTP and stores it with an expiration time.
     * @param identifier - The identifier (e.g., email, phone) for which the OTP is generated.
     * @returns The generated OTP.
     */
    public generateOTP(identifier: string): string {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        this.otpStore.set(identifier, {
            otp,
            expirationTime: expiresAt,
        })
        return otp;
    }

    /**
     * Verifies the OTP for the given identifier.
     * @param identifier - The identifier (e.g., email, phone) for which the OTP is generated.
     * @param inputOtp - The OTP entered by the user.
     * @returns True if the OTP is valid and not expired, false otherwise.
     */
    public verifyOTP(identifier: string, inputOtp: string): boolean {
        const storedData = this.otpStore.get(identifier);
        if (!storedData) {
            return false;
        }

        const { otp: storedOtp, expirationTime } = storedData;
        if (Date.now() > expirationTime || storedOtp !== inputOtp) {
            this.otpStore.delete(identifier); // Remove expired OTP
            return false;
        }

        // OTP is valid and not expired
        const isValid = storedOtp === inputOtp;
        if (isValid) this.otpStore.delete(identifier);
        return isValid;
    }
}

const otpService = new OTPService();
export default otpService;