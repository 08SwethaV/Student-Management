-- CreateTable
CREATE TABLE "Student" (
    "student_id" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "college_name" TEXT NOT NULL,
    "current_year" TEXT NOT NULL,
    "gmail_id" TEXT NOT NULL,
    "parent_number" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Marks" (
    "mark_id" TEXT NOT NULL,
    "total_marks" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "Marks_pkey" PRIMARY KEY ("mark_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Marks_student_id_key" ON "Marks"("student_id");

-- AddForeignKey
ALTER TABLE "Marks" ADD CONSTRAINT "Marks_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
