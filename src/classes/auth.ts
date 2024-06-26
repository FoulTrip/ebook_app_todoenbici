import { prisma } from "@/prisma/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

class AuthService {
  // Verifica si existe un usuario con el correo electrónico dado y si la contraseña no es "No definido"
  static async validateUser(
    email: string
  ): Promise<{ exist: boolean; pass: boolean }> {
    console.log(email);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    console.log(existingUser);

    if (!existingUser) {
      return { exist: false, pass: false }; // El usuario no existe
    }

    if (existingUser.password === "No definido") {
      return { exist: true, pass: false }; // La contraseña es "No definido"
    }

    return { exist: true, pass: true }; // Usuario válido
  }

  // Actualiza la contraseña de un usuario según su correo electrónico
  static async updatePassword(email: string, newPass: string): Promise<User> {
    const hashedPass = await bcrypt.hash(newPass, 10);
    return prisma.user.update({
      where: { email },
      data: { password: hashedPass },
    });
  }

  // Obtiene el usuario por correo electrónico y contraseña
  static async getUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null; // Credenciales inválidas o usuario no existe
    }

    return user;
  }

  // Crea un usuario con solo el correo electrónico
  static async createUser(email: string, complete_name: string): Promise<User> {
    // Puedes personalizar este método según tus necesidades
    // Por ejemplo, puedes generar una contraseña aleatoria o dejarla en blanco
    const newUser = await prisma.user.create({
      data: {
        email,
        complete_name,
      },
    });

    return newUser;
  }

  static async createUserAdmin(
    completeName: string,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        complete_name: completeName,
        email,
        password: hashedPassword,
        rol: "admin", // Set the role to "admin"
      },
    });
  }
}

export default AuthService;
