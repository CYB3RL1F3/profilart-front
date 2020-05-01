import React, { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { Input } from "components/molecules";
import { Grid, GridCol } from 'components/atoms/Grid';
import Message, { MessageType } from "components/atoms/Message";
import { Link } from "react-router-dom";
import { APIError } from 'types/Api';
import { GridCol6 } from 'components/atoms/Grid';
export interface ForgottenPasswordFormProps {
  onSubmit: (email: string) => void;
  sent?: boolean;
  loading?: boolean;
  error?: APIError;
  closeAndRedirect?: () => void;
}

export const ForgottenPasswordForm: FC<ForgottenPasswordFormProps> = ({ onSubmit, closeAndRedirect, loading, sent, error }) => {
  const { handleSubmit, register, setValue, errors } = useForm();
  const submit = useCallback((values) => {
    const { email } = values;
    if (email)
    onSubmit(email)
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
  }, [register]);

  const setEmail = useCallback(value => setValue("email", value), [setValue]);

  const icon = loading ? 'pi-spin pi-spinner' : 'pi-md-person';
  return (
    <div className="login-body">
      <form onSubmit={handleSubmit(submit)} className="login-panel">
          <div className="login-panel-content">
            <Grid>
                <GridCol>
                  <h1>Recover your password!</h1>
                </GridCol>
                <input type="hidden" value="something" />
                <GridCol>
                  {error && (
                    <Message type={MessageType.error} summary={error.message} />
                  )}
                  {sent && (
                    <Message onClose={closeAndRedirect} type={MessageType.success} summary="Password sent at your mail!" />
                  )}
                </GridCol>
                <Input
                  id="email"
                  type="email"
                  label="Your email address"
                  keyfilter="email"
                  onChange={setEmail} 
                  error={errors.email?.message || errors.email?.type}
                />
                <GridCol>
                  <Button disabled={loading || false} label="Ask new password" icon={`pi ${icon}`} />
                </GridCol>
               
                <GridCol>
                    <GridCol6>
                      <Link to="/login">back to login form</Link>
                    </GridCol6>
                </GridCol>
                
            </Grid>
          </div>
      </form>
    </div>

  )
};

export default ForgottenPasswordForm;