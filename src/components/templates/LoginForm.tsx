import React, { FC, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { Input } from "components/atoms";
import { Credentials } from "types/Profile";
import { Grid, GridCol12 } from 'components/atoms/Grid';
import Message, { MessageType } from "components/atoms/Message";
export interface LoginFormProps {
  onSubmit: (credentials: Credentials) => void;
  deleted?: boolean;
  loading?: boolean;
  error?: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, loading, deleted, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSubmit } = useForm();
  const submit = useCallback(() => {
    if (email && password)
    onSubmit({
      email,
      password
    })
  }, [email, password, onSubmit]);

  const icon = loading ? 'pi-spin pi-spinner' : 'pi-md-person';
  return (
    <div className="login-body">
      <form onSubmit={handleSubmit(submit)} className="login-panel">
          <div className="login-panel-content">
            <Grid>
                <GridCol12>
                  <h1>Sign-in to Profilart</h1>
                </GridCol12>
                <input type="hidden" value="something" />
                <GridCol12>
                  {error && (
                    <Message type={MessageType.error} summary="Invalid credentials" />
                  )}
                  {deleted && (
                    <Message type={MessageType.success} summary="Account successfully deleted" />
                  )}
                </GridCol12>
                <GridCol12>
                  <Input
                    id="email"
                    type="email"
                    label="email" 
                    value={email}
                    required
                    keyfilter="email"
                    onChange={setEmail} />
                </GridCol12>
                <GridCol12>
                  <Input
                    id="password"
                    label="password"
                    type="password"
                    required
                    value={password} 
                    onChange={setPassword} 
                  />
                </GridCol12>
                <GridCol12>
                  <Button disabled={loading || false} label="sign in" icon={`pi ${icon}`} />
                </GridCol12>
            </Grid>
          </div>
      </form>
    </div>

  )
};

export default LoginForm;