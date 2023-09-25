import queryDatabase from "./dbConnect"
import bcrypt from "bcrypt"

async function getUserByEmail(email) {
    try {
        const rows = await queryDatabase('select * from users where email = ?', [email])
        if (rows.length === 0) return null
        return rows[0]
    } catch (err) {
        console.error('Error in getUserByEmail:', err)
        throw err
    }
}

async function createUser(email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)'
        const values = [email, hashedPassword]
        const result = await queryDatabase(sql, values)
        return result.insertId
    } catch (err) {
        console.error('Error in createUser:', err)
        throw err
    }
}

async function getUserById(id) {
    try {
        const sql = 'select * from users where u_id = ?'
        const values = [id]
        const result = await queryDatabase(sql, values)
        return result
    } catch (err) {
        console.error('Error in getUserById: ', err)
        throw err
    }
}

module.exports = {
    getUserByEmail,
    createUser,
    getUserById
}