-- CreateTable
CREATE TABLE "eventSignup" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "pronouns" TEXT,
    "accessSource" TEXT,
    "reasonForAttending" TEXT,
    "school" TEXT,
    "grade" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventSignup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "bio" TEXT,
    "titles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "email" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timeslot" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "durationUnit" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "dayOfWeek" TEXT,
    "month" TEXT NOT NULL,

    CONSTRAINT "Timeslot_pkey" PRIMARY KEY ("id")
);
