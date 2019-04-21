import Web3Eth from "@smilo-platform/web3-eth-accounts";

export const KEY_STORE_STORAGE_KEY = "wallet";

export class WalletProvider {

    constructor(accountProvider) {
        this.walletUnlock = new EventEmitter();
        this.accountProvider = accountProvider;

        this.web3Eth = new Web3Eth();

        this.accountProvider.onPasswordChanged().subscribe(
            () => this.restoreWallet()
        );
    }

    /**
     * Creates a new wallet.
     */
    createNew(){
        this.generateNew();
        this.save();
    }

    onWalletUnlocked() {
        return this.walletUnlock.asObservable();
    }

    restoreWallet(){
        this.privateKey = this.accountProvider.decryptFromStorage(KEY_STORE_STORAGE_KEY);
        // this.privateKey = "0000000000000000000000000000000000000000000000000073656372657430";
        if(this.privateKey) {
            let account = this.web3Eth.privateKeyToAccount(this.privateKey);
            this.publicKey = account.address;

            this.walletUnlock.emit();
        }
    }

    generateNew() {
        let account = this.web3Eth.create();
        this.publicKey = account.address;
        this.privateKey = account.privateKey;
        // this.privateKey = "0000000000000000000000000000000000000000000000000073656372657430";
    }

    save() {
        this.accountProvider.encryptToStorage(KEY_STORE_STORAGE_KEY, this.privateKey);
    }

    getPublicKey() {
        return this.publicKey;
    }

    getPrivateKey() {
        return this.privateKey;
    }
}