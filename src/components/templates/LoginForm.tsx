import React, { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { Input } from "components/molecules";
import { Credentials } from "types/Profile";
import { Grid, GridCol } from 'components/atoms/Grid';
import Message, { MessageType } from "components/atoms/Message";
import { Link } from "react-router-dom";
export interface LoginFormProps {
  onSubmit: (credentials: Credentials) => void;
  deleted?: boolean;
  loading?: boolean;
  error?: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, loading, deleted, error }) => {
  const { handleSubmit, register, setValue } = useForm();
  const submit = useCallback((values) => {
    const { email, password } = values;
    if (email && password)
    onSubmit({
      email,
      password
    })
  }, [onSubmit]);

  useEffect(() => {
    register({ 
      name: "email" 
    }, { 
      required: true, 
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address"
      }
    });
    register({ 
      name: "password" 
    }, { 
      required: true
    });
  }, [register]);

  const setEmail = useCallback(value => setValue("email", value), [setValue]);
  const setPassword = useCallback(value => setValue("password", value), [setValue]);


  const icon = loading ? 'pi-spin pi-spinner' : 'pi-md-person';
  return (
    <div className="login-body">
      <form onSubmit={handleSubmit(submit)} className="login-panel">
          <div className="login-panel-content">
            <Grid>
                <GridCol>
                  <h1>Sign-in to Profilart</h1>
                </GridCol>
                <input type="hidden" value="something" />
                <GridCol>
                  {error && (
                    <Message type={MessageType.error} summary="Invalid credentials" />
                  )}
                  {deleted && (
                    <Message type={MessageType.success} summary="Account successfully deleted" />
                  )}
                </GridCol>
                <Input
                  id="email"
                  type="email"
                  label="email"
                  required
                  keyfilter="email"
                  onChange={setEmail} />
                <Input
                  id="password"
                  label="password"
                  type="password"
                  required
                  onChange={setPassword} 
                />
                <GridCol>
                  <Button disabled={loading || false} label="sign in" icon={`pi ${icon}`} />
                </GridCol>
                <GridCol>
                    <p>
                      <Link to="/register">create an account</Link>
                    </p>
                </GridCol>
                
            </Grid>
          </div>
      </form>
    </div>

  )
};

export default LoginForm;