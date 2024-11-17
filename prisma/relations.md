# Prisma Relations Guide

### One-to-One Relation

A record from exactly one model relates to exactly one record from another model. The relation is defined using `@relation`, where `fields` specify the foreign key and `references` specify the referenced model's primary key.

```prisma
model UserProfile {
    id      Int
    bio     String
    userId  Int
    user    User @relation(fields: [userId], references: [id])
}

model User {
    id      Int
    email   String
    profile UserProfile? // Optional one-to-one relation
}
```

- In this example, a UserProfile has a userId that references the User model. Each User can have one UserProfile, and each UserProfile is linked to one User.

### One-to-Many Relation
In this case, one record from one model relates to multiple records from another model. The relation is achieved using an array type ([]).

```prisma
model Post {
    id       Int
    title    String
    authorId Int
    author   User @relation(fields: [authorId], references: [id])
}

model User {
    id    Int
    email String
    posts Post[] // A user has many posts
}
```

### Many-to-Many Relation
This relation involves multiple records from one model being linked to multiple records from another model. It is commonly implemented using a join table. You can name the relationship using a relation name (in this case, "UserRole").

```prisma
model User {
    id    Int
    email String
    roles Role[] @relation("UserRole") // Many-to-many relation with Role
}

model Role {
    id    Int
    name  String
    users User[] @relation("UserRole") // Many-to-many relation with User
}
```

### Self-Relation
A model relates to itself, often used for hierarchical data structures like trees or organizational charts. The @relation attribute can be used to define both parent and child relationships within the same model.

```primsa
model Category {
    id       Int
    name     String
    parentId Int?
    parent   Category? @relation("Subcategories", fields: [parentId], references: [id])
    children Category[] @relation("Subcategories")
}
```

- In this self-referencing example, a Category can have a parent and multiple children. This setup is ideal for hierarchical data, like categories and subcategories.

### Notes on @relation Names
1. Relation names (like "UserRole") are optional identifiers used to explicitly name the relationship between two models.
2. They help distinguish between multiple relationships between the same two models or clarify complex relationships in your schema.

