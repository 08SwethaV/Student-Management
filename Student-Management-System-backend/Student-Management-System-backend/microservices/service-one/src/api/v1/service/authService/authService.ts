const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const register = async ({ email, dob, password = "", role, student_id = null, student_name, college_name, current_year, gmail_id, parent_number, address, attendance }: any) => {

  const hashedPassword = await bcrypt.hash(dob, 10);

  const user = await prisma.user.create({
    data: {
      email,
      dob,
      password: hashedPassword,
      role,
    },
  });

  if (role === 'STUDENT') {
    const userData = await prisma.student.create({
      data: {
        user_id: parseInt(`${user.id}`),
        student_name: student_name,
        college_name: college_name,
        current_year: current_year,
        gmail_id: gmail_id,
        parent_number: parent_number,
        address: address,
        attendance: attendance
      },
    });

    const markData = await prisma.marks.create({
      data: {
        total_marks: "0",
        student_id: userData.student_id
      }
    })

    return { userData, markData }
  } else {
    return user;
  }


};

export const login = async ({ email, password }: any) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid email or password');
  }
  else {
    const token = jwt.sign({ userId: user.id, role: user.role }, "key", { expiresIn: '1h' });
    return { token, user };
  }
};

export const checkUnqineUser = async ({ email }: any) => {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (user === null) {
    return true
  }
  else {
    return false
  }
}
