import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api

export interface BodyType {
  step: number;
  trip: Trip;
  complement: Complement;
  amountOfTravelers: number;
  price: number;
  city: string;
  type: string;
  date: DateClass;
  isFlexible: boolean;
  fullName: string;
  email: string;
  prefix: number;
  phone: number;
  question: string;
  marketing: boolean;
}

export interface Complement {
  label: string;
  price: string;
}

export interface DateClass {
  from: Date;
  to: Date;
}

export interface Trip {
  value: string;
  label: string;
}

export async function POST(request: Request) {
  const username = process.env.EMAIL_USERNAME;
  const password = process.env.EMAIL_PASSWORD;
  const myEmail = process.env.PERSONAL_EMAIL;

  const data = (await request.json()) as BodyType;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: username,
      pass: password
    }
  });

  console.log("data!!!!!!!!!!", data);

  const fromDate = new Date(data.date.from);
  const toDate = new Date(data.date.to);

  try {
    await transporter.sendMail({
      from: username,
      to: myEmail,
      replyTo: data.email,
      subject: `${data.email} esta interesado`,
      html: `
            <p>Nombre completo: ${data.fullName}</p>
            <p>Ciudad de residencia: ${data.city}</p>
            <p>Email: ${data.email}</p>
            <p>Teléfono: ${data.prefix} ${data.phone}</p>
            ${data.question && `<p>Como nos conoció: ${data.question}</p>`}
            <p>¿Ha aceptado ser enviado material de marketing? ${data.marketing ? "Si" : "No"}</p>
            <p>Tipo de viaje: ${data.type}</p>
            <p>Lugar de viaje: ${data.trip.label}</p>
            ${Object.keys(data.complement).length ? `<p>Complemento del viaje: ${data.complement.label}</p>` : ""}
            ${Object.keys(data.complement).length ? `<p>Precio del complemento del viaje: ${data.complement.price}</p>` : ""}
            <p>Cantidad de viajeros: ${data.amountOfTravelers}</p>
            <p>Presupuesto por viajero ${Object.keys(data.complement).length ? "(sin incluir los añadidos)" : ""}: ${data.price}</p>
            <p>Fechas del viaje: Desde el ${fromDate.getDate()}/${fromDate.getMonth()}/${fromDate.getFullYear()} hasta el ${toDate.getDate()}/${toDate.getMonth()}/${toDate.getFullYear()}</p>
            <p>¿Son las fechas flexibles?: ${data.isFlexible ? "Si" : "No"}</p>
            `
    });

    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" });
  }
}
