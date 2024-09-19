document.addEventListener('DOMContentLoaded', function () {

    var quill = new Quill('#emailBody', {
        theme: 'snow'
    });

    const emailForm = document.getElementById('emailForm');
    emailForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const recipientEmail = document.getElementById('recipientEmail').value;
        const subject = document.getElementById('emailSubject').value;
        const body = quill.root.innerHTML; 
        const tags = Array.from(document.getElementById('tags').selectedOptions).map(option => option.value);

        if (!recipientEmail || !subject || !body) {
            alert('Please fill in all the required fields.');
            return;
        }

        const emailData = {
            recipient: recipientEmail,
            subject: subject,
            body: body,
            tags: tags
        };

        axios.post('/api/send-email', emailData)
            .then(function (response) {
                alert('Email sent successfully!');
            })
            .catch(function (error) {
                console.error('Error sending email:', error);
                alert('Error sending email. Please try again.');
            });
    });
});
