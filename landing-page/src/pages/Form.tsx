//import * as React from "react";
import { Form } from "radix-ui";
import './form.css';
import SelectDemo from "../components/Select";

const FormDemo = () => (
	<Form.Root className="FormRoot">
		{/* שם */}
		<Form.Field className="FormField" name="email">
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
				<input className="Input" type="email" required />
			</Form.Control>

		</Form.Field>

		{/* שם משפחה */}
		<Form.Field className="FormField" name="email">
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
				<input className="Input" type="email" required />
			</Form.Control>

		</Form.Field>

		{/* תחום */}
	{/* אימייל */}
		<Form.Field className="FormField" name="email">
			<div
				style={{
					display: "flex",
					alignItems: "baseline",
					justifyContent: "space-between",
				}}
			>
					<SelectDemo />
			</div>
			<Form.Control asChild>
				<input className="Input" type="email" required />
			</Form.Control>

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

export default FormDemo;
