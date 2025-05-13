/** @type {import("drizzle-kit").Config} */
export default {
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_DE9glpLvIhx2@ep-small-glitter-a4bl5nkw-pooler.us-east-1.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
};