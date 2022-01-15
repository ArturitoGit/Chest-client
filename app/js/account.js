async function onAccountPageLoaded (account)
{
    const back_btn = document.getElementById("btn_back")
    const delete_btn = document.getElementById("btn_delete")
    const edit_btn = document.getElementById("btn_edit")
    const link_field = document.getElementById("link-field")
    const username_field = document.getElementById("username-field")
    const password_field = document.getElementById("password-field")
    const name_field = document.getElementById("name-field")

    const btn_copy_link = document.getElementById("btn_copy_link")
    const btn_copy_username = document.getElementById("btn_copy_username")
    const btn_copy_password = document.getElementById("btn_copy_password")

    const link_div = document.getElementById("account-link-div")
    const username_div = document.getElementById("account-username-div")

    // Get the account infos from the core project
    var result = await decryptPassword(account)

    var password = result.success ? result.clearPassword : "???"
    // Update the password in the account
    account.password = password 

    // Back action
    back_btn.onclick = () => DisplayAccountsPage() 

    fillFields(account, password)

    // Fill the fields of the account
    function fillFields (account, password)
    {
        // If there is no link than collapse the link div
        if (account.link) link_field.innerHTML = shortenLink(account.link || "")
        else link_div.style.display = "none"

        // Same for username
        if (account.username) username_field.innerHTML = shortenLink(account.username || "")
        else username_div.style.display = "none"

        name_field.innerHTML = account.name
        password_field.innerHTML = password || ""
    }

    // If link field is clicked then the link must be open in the browser
    link_field.onclick = () => openLink(account.link)

    // Delete btn action
    delete_btn.onclick = () => 
    {
        // Delete the account
        deleteAccount( account )
            // Then Display the menu
            .then(DisplayAccountsPage())
    }

    // Edit btn action
    edit_btn.onclick = () => DisplayAccountEditPage( account ) ;

    btn_copy_link.onclick = () => 
    {
        ResetAllCopyIcons()
        setClipboard(link_field.innerText)
        CheckCopyIcon(btn_copy_link)
    }

    btn_copy_password.onclick = () => 
    {
        ResetAllCopyIcons()
        setClipboard(account.password || "")
        CheckCopyIcon(btn_copy_password)
    }

    btn_copy_username.onclick = () =>
    {
        ResetAllCopyIcons()
        setClipboard(account.username || "")
        CheckCopyIcon(btn_copy_username)
    }

    function ResetAllCopyIcons () {
        Array.from(document.getElementsByClassName("bi bi-clipboard-check"))
            .forEach(i => UnCheckCopyIcon(i))
    }

    function shortenLink (link)
    {
        var MAX_LENGTH = 30 ;
        // Shorten the link if too short
        if (link.length >= MAX_LENGTH) return link.substring(0, MAX_LENGTH - 3) + "..."
        return link
    }

}