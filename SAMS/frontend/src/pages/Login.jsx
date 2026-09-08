import { useState } from 'react';
import { Plane, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      await login({
        email,
        password,
      });

      const redirectPath =
        location.state?.from?.pathname || '/dashboard';

      navigate(redirectPath, {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Login failed. Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-art">

        <div className="login-brand">
          <div className="brand-mark">
            <Plane size={28} />
          </div>

          <b>SAMS</b>
        </div>

        <h1>
          Smarter Airports.
          <br />
          Brighter Journeys.
        </h1>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-side">

        <form
          className="login-card card"
          onSubmit={handleSubmit}
        >

          {/* Mobile Logo */}
          <div className="login-brand mobile-only">
            <div className="brand-mark">
              <Plane size={25} />
            </div>

            <b>SAMS</b>
          </div>

          <h2>Welcome back</h2>

          <p>
            Sign in to your airport operations workspace.
          </p>

          {/* Error */}
          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {/* Email */}
          <label>
            Email

            <input
              required
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@sams.com"
              autoComplete="email"
            />
          </label>

          {/* Password */}
          <label>
            Password

            <div className="password">

              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="••••••••"
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>
          </label>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <small>
            Use an account created through POST /api/auth/register.
          </small>

        </form>

      </div>

    </div>
  );
}