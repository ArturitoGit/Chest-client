function onLoginPageLoaded ()
{
    const msg_error = document.getElementById('msg-error')
    const password_field = document.getElementById('input_pwd')
    const btn_submit = document.getElementById('btn-submit')

    btn_submit.onclick = submit
    // To press enter after typing the password will submit
    password_field.addEventListener("keyup", ({key}) => {
        if (key == "Enter") submit() 
    })

    async function submit ()
    {
        // Reset the error msg
        msg_error.style.visibility = "hidden"

        var password_candidate = password_field.value 

        // Call the login request
        var result = await openChest(password_candidate)

        // If wrong password
        if (!result.success)
        {
            msg_error.style.visibility = "visible"
            return
        }

        // if right password
        // EXPORT THE PASSWORD TO KEEP IT
        SetGlobalPassword(password_candidate)
        DisplayAccountsPage()
    }
}