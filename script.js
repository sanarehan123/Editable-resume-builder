document.getElementById('resume-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input values
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const experience = document.getElementById('experience').value;

    // Generate resume content
    const resumePreview = document.getElementById('resume-preview');
    resumePreview.innerHTML = `
        <h2>${fullName}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <h3>Skills</h3>
        <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        <h3>Experience</h3>
        <p>${experience}</p>
    `;

    // Show the resume preview and download button
    resumePreview.style.display = 'block';
    document.getElementById('download-pdf').style.display = 'inline-block';
});

document.getElementById('download-pdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const resumePreview = document.getElementById('resume-preview');
    html2canvas(resumePreview).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // A4 width in mm
        const pageHeight = 277; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add the first page
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if content exceeds one page
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        doc.save('resume.pdf');
    });
});




