import User from '../../src/app/models/User'
import app from '../../src/config/app'
import request from 'supertest'

describe('Signup route', () => {
  it('should create a user through signup route with valid response body',
    async () => {
      const response = await request(app).post('/signup')
        .send({
          fullName: 'FULANO DEUTRANO CICLANO',
          email: 'fulano_example@example.com',
          password: '123@abc',
          confirmPassword: '123@abc'
        })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message')
    }
  )

  it('should not be abble to create a user without Full Name',
    async () => {
      const response = await request(app).post('/signup')
        .send({
          email: 'fulano_example@example.com',
          password: '123@abc',
          confirmPassword: '123@abc'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Name was not provided!')
    }
  )

  it('should not be abble to create a user without E-mail address',
    async () => {
      const response = await request(app).post('/signup')
        .send({
          fullName: 'FULANO DEUTRANO CICLANO',
          password: '123@abc',
          confirmPassword: '123@abc'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('E-mail was not provided!')
    }
  )

  it('should not be abble to create a user with invalid email',
    async () => {
      const response = await request(app).post('/signup')
        .send({
          fullName: 'FULANO DEUTRANO CICLANO',
          email: 'hacker.exe',
          password: '123@abc',
          confirmPassword: '123@abc'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Enter a valid email address!')
    }
  )

  it('should not be abble to create a user with a weak password',
    async () => {
      const response = await request(app).post('/signup')
        .send({
          fullName: 'FULANO DEUTRANO CICLANO',
          email: 'hacker.exe',
          password: '123456789',
          confirmPassword: '123456789'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
    }
  )

  it('should not be abble to create a user without Password',
    async () => {
      const response = await request(app).post('/signup')
        .send({
          fullName: 'FULANO DEUTRANO CICLANO',
          email: 'fulano_example@example.com',
          confirmPassword: '123@abc'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Password was not provided!')
    }
  )

  it('should not be abble to create a user without confirmPassword',
    async () => {
      const response = await request(app).post('/signup')
        .send({
          fullName: 'FULANO DEUTRANO CICLANO',
          email: 'fulano_example@example.com',
          password: '123@abc'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Password confirmation was not provided!')
    }
  )

  it('should not be abble to create a user with different password and confirmPassword',
    async () => {
      const response = await request(app).post('/signup')
        .send({
          fullName: 'FULANO DEUTRANO CICLANO',
          email: 'fulano_example@example.com',
          password: '123@abc',
          confirmPassword: 'abc@123'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('Password do not match!')
    }
  )

  it('should not be abble to create a user a user who already exists in the database',
    async () => {
      const user = await User.create({
        fullName: 'FULANO DEUTRANO CICLANO',
        email: 'fulano_example@example.com',
        password: '123@abc'
      })

      const response = await request(app).post('/signup')
        .send({
          fullName: 'FULANO DEUTRANO CICLANO',
          email: user.email,
          password: '123@abc',
          confirmPassword: '123@abc'
        })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('A user with this email already exists!')
    }
  )
})

afterEach(async () => {
  await User.findOneAndDelete({ email: 'fulano_example@example.com' })
})
