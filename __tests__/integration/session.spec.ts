import User from '../../src/app/models/User'
import app from '../../src/config/app'
import request from 'supertest'

describe('Authentication', () => {
  it('should return error if body request does not contain email and password',
    async () => {
      const response = await request(app).post('/login')
        .send({})

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual('Enter email and password!')
    }
  )

  it('should return error if email does not exist in the database',
    async () => {
      const response = await request(app).post('/login')
        .send({
          email: 'fulano_example2@example.com',
          password: 'abc@123'
        })
      expect(response.status).toBe(400)
      expect(response.body.message).toEqual('User not found!')
    }
  )

  it('should return error if password does not match',
    async () => {
      const user = await User.create({
        fullName: 'Fulano',
        email: 'fulano_example2@example.com',
        password: 'abc@123'
      })

      const response = await request(app).post('/login')
        .send({
          email: user.email,
          password: '123@abc'
        })

      expect(response.status).toEqual(401)
      expect(response.body.message).toEqual('Invalid email or password!')
    }
  )

  it('should return jwt token when autenticated',
    async () => {
      const user = await User.create({
        fullName: 'Fulano',
        email: 'fulano_example2@example.com',
        password: 'abc@123'
      })

      const response = await request(app).post('/login')
        .send({
          email: user.email,
          password: 'abc@123'
        })

      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('token')
    }
  )

  // it('should be able to access private routes when authenticated', async () => {
  //   const user = await User.create({
  //     fullName: 'Fulano',
  //     email: 'fulano_example2@example.com',
  //     password: 'abc@123'
  //   })

  //   const login = await request(app).post('/login')
  //     .send({
  //       email: user.email,
  //       password: 'abc@123'
  //     })

  //   const response = await request(app)
  //     .get('/dashboard')
  //     .set('Authorization', `Bearer ${login.body.token}`)

  //   expect(response.status).toBe(200)
  // })

  // it('should not be able to access private routes without jwt token', async () => {
  //   const response = await request(app).get('/dashboard')

  //   expect(response.status).toBe(401)
  // })

  // it('should not be able to access private routes with invalid jwt token', async () => {
  //   const response = await request(app)
  //     .get('/dashboard')
  //     .set('Authorization', 'Bearer 123123')

  //   expect(response.status).toBe(401)
  // })
})

afterEach(async () => {
  await User.findOneAndDelete({ email: 'fulano_example2@example.com' })
})
