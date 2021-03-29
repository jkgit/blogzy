# A simple class to create a not-very secure JWT token for the purpose of
# authenticating a user once they prove credentials
class JwtService
  # not so secret, but good enough for now, in reality would store in kms, encrypted databag, or something similar
  SECRET_KEY = "123456789"

  def initialize(token = nil)
    @token = token
  end

  def self.create(email)
    @token = JWT.encode({
      tar: 'blogzy',
      sub: email,
      exp: 24.hours.from_now.to_i
    }, SECRET_KEY)
    return @token
  end

  def check
    decoded = JWT.decode(@token, SECRET_KEY)
    return nil unless decoded && decoded.length!=1
    decoded = decoded[0]
    return nil unless decoded['tar'] == 'blogzy' # we know it isn't expired and matches secret key
    decoded['sub']
  end
end