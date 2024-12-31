export const templates = [
	{
		id: 'blank',
		label: 'Blank document',
		imageUrl: '/blank-document.svg',
		initialContent: '',
	},
	{
		id: 'software-proposal',
		label: 'Software proposal document',
		imageUrl: '/software-proposal.svg',
		initialContent: `
		<main>
			<h1>Software Proposal</h1>
			<section>
				<h2>Executive Summary</h2>
				<p>[Summary of the software proposal]</p>
			</section>
			<section>
				<h2>Problem Statement</h2>
				<p>[Description of the problem to be solved]</p>
			</section>
			<section>
				<h2>Proposed Solution</h2>
				<p>[Details of the proposed software solution]</p>
			</section>
			<section>
				<h2>Timeline</h2>
				<ul>
					<li>[Milestone 1]</li>
					<li>[Milestone 2]</li>
					<li>[Milestone 3]</li>
				</ul>
			</section>
			<section>
				<h2>Budget</h2>
				<p>[Budget breakdown]</p>
			</section>
		</main>

		`,
	},
	{
		id: 'project-proposal',
		label: 'Project proposal document',
		imageUrl: '/project-proposal.svg',
		initialContent: `
			<main>
			  <h1>Project Proposal</h1>
			  <section>
			    <h2>Introduction</h2>
			    <p>[Brief introduction to the project]</p>
			  </section>
			  <section>
			    <h2>Objectives</h2>
			    <ul>
			      <li>[Objective 1]</li>
			      <li>[Objective 2]</li>
			      <li>[Objective 3]</li>
			    </ul>
			  </section>
			  <section>
			    <h2>Methodology</h2>
			    <p>[Details of the approach or methods]</p>
			  </section>
			  <section>
			    <h2>Expected Outcomes</h2>
			    <p>[Description of expected results]</p>
			  </section>
			</main>
		`,
	},
	{
		id: 'business-letter',
		label: 'Business Letter',
		imageUrl: '/business-letter.svg',
		initialContent: `
			<main>
			  <h1>Business Letter</h1>
			  <p>[Sender's Name]</p>
			  <p>[Sender's Address]</p>
			  <p>[Date]</p>
			  <p>[Recipient's Name]</p>
			  <p>[Recipient's Address]</p>
			  <p>[Subject]</p>
			  <p>[Dear Recipient's Name,]</p>
			  <p>[Body of the letter]</p>
			  <p>Sincerely,</p>
			  <p>[Sender's Name]</p>
			</main>

		`,
	},
	{
		id: 'resume',
		label: 'Resume',
		imageUrl: '/resume.svg',
		initialContent: `
		<main>
		  <h1>[Your Name]</h1>
		  <section>
		    <h2>Contact Information</h2>
		    <p>[Email, Phone, LinkedIn, etc.]</p>
		  </section>
		  <section>
		    <h2>Professional Summary</h2>
		    <p>[Brief overview of skills and experience]</p>
		  </section>
		  <section>
		    <h2>Experience</h2>
		    <ul>
		      <li>[Job Title, Company, Dates]</li>
		      <li>[Job Title, Company, Dates]</li>
		    </ul>
		  </section>
		  <section>
		    <h2>Education</h2>
		    <ul>
		      <li>[Degree, School, Dates]</li>
		    </ul>
		  </section>
		</main>

		`,
	},
	{
		id: 'cover-letter',
		label: 'Cover Letter',
		imageUrl: '/cover-letter.svg',
		initialContent: `
		<main>
		  <h1>Cover Letter</h1>
		  <p>[Sender's Name]</p>
		  <p>[Sender's Address]</p>
		  <p>[Date]</p>
		  <p>[Recipient's Name]</p>
		  <p>[Recipient's Address]</p>
		  <p>[Dear Recipient's Name,]</p>
		  <p>[Introduction: State the purpose of your letter]</p>
		  <p>[Body: Highlight qualifications and interest in the position]</p>
		  <p>[Conclusion: Express eagerness and request for further communication]		</p>
		  <p>Sincerely,</p>
		  <p>[Sender's Name]</p>
		</main>

		`,
	},
	{
		id: 'letter',
		label: 'Letter',
		imageUrl: '/letter.svg',
		initialContent: `
		<main>
		  <h1>Letter</h1>
		  <p>[Sender's Name]</p>
		  <p>[Sender's Address]</p>
		  <p>[Date]</p>
		  <p>[Recipient's Name]</p>
		  <p>[Recipient's Address]</p>
		  <p>[Dear Recipient's Name,]</p>
		  <p>[Body of the letter]</p>
		  <p>Sincerely,</p>
		  <p>[Sender's Name]</p>
		</main>

		`,
	},
];
