//import * as React from "react";
import { Form } from "radix-ui";
import './form.css';
import SelectDemo from "../components/Select";
import axios from 'axios';

const FormDemo = () => {

	// הפונקציה תהיה אחראית לשליחת המידע באמצעות אקסיוס
	const doApi = async (data: Record<string, FormDataEntryValue>) => {
        try {
            // שולחים את המידע לשרת שניצור
            const response = await axios.post("http://localhost:3000/api/submit", data);
            alert("נשלח בהצלחה!");
        } catch (error) {
            console.log("שגיאה:", error);
        }
    }

	// פונקציה שתאסוף את המידע ותשלח אותו לפונקציה שתשלח את המידע
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault(); // פקודה שתפסיק את הרענון של העמוד אחרי שליחת הטופס

        const formData = new FormData(event.currentTarget); // נסרוק את הטופס ונאסוף את המידע

        const data = Object.fromEntries(formData); // נמיר את המידע לאובייקט רגיל
        
        // קריאה לפונקציית ה-API
        doApi(data);
    };

	
	return(
		
		//  Radix הקטע קוד נלקח מהכלי
		// Radix -> Primitives -> Form

		<Form.Root className="FormRoot" onSubmit={handleSubmit}>

			{/* שם */}
			<Form.Field className="FormField" name="firstName">
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						justifyContent: "space-between",
					}}
				>
					<Form.Label className="FormLabel">שם</Form.Label>
					<Form.Message className="FormMessage" match="valueMissing">
						תכניס את השם שלך
					</Form.Message>
					<Form.Message className="FormMessage" match="typeMismatch">
						תכניס שם תקין בבקשה
					</Form.Message>
				</div>
				<Form.Control asChild>
					<input className="Input" type="text" required />
				</Form.Control>

			</Form.Field>

			{/* שם משפחה */}
			<Form.Field className="FormField" name="lastName">
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						justifyContent: "space-between",
					}}
				>
					<Form.Label className="FormLabel">שם משפחה</Form.Label>
					<Form.Message className="FormMessage" match="valueMissing">
						תכניס את שם המשפחה שלך
					</Form.Message>
					<Form.Message className="FormMessage" match="typeMismatch">
						תכניס שם משפחה תקין בבקשה
					</Form.Message>
				</div>
				<Form.Control asChild>
					<input className="Input" type="text" required />
				</Form.Control>

			</Form.Field>

			{/* תחום */}
			<Form.Field className="FormField" name="studyField">
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						justifyContent: "space-between",
					}}
				>
						<SelectDemo />
				</div>

			</Form.Field>
		
			{/* אימייל */}
			<Form.Field className="FormField" name="email">
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						justifyContent: "space-between",
					}}
				>
					<Form.Label className="FormLabel">אימייל</Form.Label>
					<Form.Message className="FormMessage" match="valueMissing">
						תכניס את האימייל שלך
					</Form.Message>
					<Form.Message className="FormMessage" match="typeMismatch">
						תכניס כתובת אימייל תקינה
					</Form.Message>
				</div>
				<Form.Control asChild>
					<input className="Input" type="email" required />
				</Form.Control>

			</Form.Field>

			<Form.Submit asChild>
				<button className="Button" style={{ marginTop: 10 }}>
					שליחה
				</button>
			</Form.Submit>
		</Form.Root>
	);
}
export default FormDemo;
