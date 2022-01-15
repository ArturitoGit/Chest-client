
const ADDRESS_PREFIX = "https://localhost:5001/"
const get = (address) => window.myAPI.ipcRenderer.invoke("get", { address: address })
const post = (address, params) => window.myAPI.ipcRenderer.invoke("post", { address: address, params: params })

const SetGlobalPassword = (password) => window.myAPI.ipcRenderer.invoke("setGlobalPassword", {password: password})

const GetGlobalPassword = () => 
{
    return window.myAPI.ipcRenderer.invoke("getGlobalPassword", {} )
}


function openChest ( password )
{
    return post(ADDRESS_PREFIX + "CheckPassword", {Password: password})
}

function deleteAccount ( account )
{
    // Get the global password
    return GetGlobalPassword().then (password => 
        post(ADDRESS_PREFIX + "DeleteAccount", 
            {
                GlobalPassword: password,
                account: account
            })
    )
}

function decryptPassword (account)
{
    // Get the global password
    return GetGlobalPassword()
        // Use the password to decrypt the account password
        .then(password => post(ADDRESS_PREFIX+"DecryptPassword", { GlobalPassword: password, Account: account}))
}

function editAccount ( oldAccount, newAccount )
{
    return GetGlobalPassword().then(password => 
        post(ADDRESS_PREFIX + "EditAccount", 
        {
            GlobalPassword: password,
            Id: oldAccount.id,
            Name: newAccount.name,
            AccountClearPassword: newAccount.password,
            Link: newAccount.link,
            Username: newAccount.username
        }))
}

function editPassword (oldPassword, newPassword)
{
    return post(ADDRESS_PREFIX + "SetPassword", {
        OldPassword: oldPassword,
        NewPassword: newPassword
    })
}

function createPassword (password)
{
    return post(ADDRESS_PREFIX + "SetPassword", {
        OldPassword: "",
        NewPassword: password
    })
}

function isPasswordRegistered ()
{
    return get(ADDRESS_PREFIX + "IsPasswordRegistered")
}

function addAccount (account)
{
    // Get the global password
    return GetGlobalPassword().then(password =>
        // Use that password to add an account
        post(ADDRESS_PREFIX + "AddAccount", 
        {
            GlobalPassword: password,
            Name: account.name,
            AccountClearPassword: account.clearPassword,
            Link: account.link,
            Username: account.username
        })
    )
}

function generatePassword ( 
    size,
    upper, lower, symbols, numbers,
    mandatory_letters )
{
    return post(ADDRESS_PREFIX + "GeneratePassword", {
        PasswordLength: size,
        UseUpperAlphabet: upper,
        UseLowerAlphabet: lower,
        UseNumbers: numbers,
        UseSymbols: symbols,
        ForcedSubsets: Array.from(mandatory_letters)
    })
}

async function setClipboard ( content )
{
    window.myAPI.ipcRenderer.invoke("setClipboard", {content: content})
}

function openLink(link) {
    window.myAPI.ipcRenderer.invoke("openLink", {link: link})
}

function GetAccounts ()
{
    return get(ADDRESS_PREFIX + "GetAccounts")
}

