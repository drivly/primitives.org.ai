import React from 'react'
import { FormConfig, FormField, ThemeConfig } from '../types'

interface FormComponentProps {
  form: FormConfig
  theme?: ThemeConfig
}

export const FormComponent: React.FC<FormComponentProps> = ({ form, theme }) => {
  const { title, fields, submitLabel = 'Submit', cancelLabel = 'Cancel' } = form

  const renderField = (field: FormField, index: number) => {
    const { label, type, placeholder, required, options, value } = field

    const inputStyles = {
      width: '100%',
      padding: '8px 12px',
      borderRadius: theme?.borderRadius || 4,
      border: `1px solid ${theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'}`,
      backgroundColor: theme?.colorScheme === 'dark' ? '#333333' : '#ffffff',
      color: theme?.colorScheme === 'dark' ? '#ffffff' : '#000000',
      marginTop: '4px',
    }

    return (
      <div
        key={`form-field-${index}`}
        style={{
          marginBottom: '16px',
        }}
      >
        <label
          style={{
            display: 'block',
            marginBottom: '4px',
            fontWeight: 500,
            color: theme?.colorScheme === 'dark' ? '#dddddd' : '#333333',
          }}
        >
          {label}
          {required && <span style={{ color: '#ff4d4f', marginLeft: '4px' }}>*</span>}
        </label>

        {type === 'text' || type === 'email' || type === 'password' || type === 'number' || type === 'date' ? (
          <input type={type} placeholder={placeholder} defaultValue={value as string | number | undefined} style={inputStyles} />
        ) : type === 'textarea' ? (
          <textarea placeholder={placeholder} defaultValue={value as string | undefined} style={{ ...inputStyles, minHeight: '80px', resize: 'vertical' }} />
        ) : type === 'select' ? (
          <select defaultValue={value as string | number | undefined} style={inputStyles}>
            {options?.map((option, optionIndex) => (
              <option key={`option-${optionIndex}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === 'checkbox' ? (
          <div style={{ marginTop: '8px' }}>
            {options?.map((option, optionIndex) => (
              <div key={`checkbox-${optionIndex}`} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <input type='checkbox' id={`checkbox-${index}-${optionIndex}`} defaultChecked={value === option} style={{ marginRight: '8px' }} />
                <label htmlFor={`checkbox-${index}-${optionIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        ) : type === 'radio' ? (
          <div style={{ marginTop: '8px' }}>
            {options?.map((option, optionIndex) => (
              <div key={`radio-${optionIndex}`} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <input
                  type='radio'
                  id={`radio-${index}-${optionIndex}`}
                  name={`radio-group-${index}`}
                  defaultChecked={value === option}
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor={`radio-${index}-${optionIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: theme?.colorScheme === 'dark' ? '#222222' : '#ffffff',
        borderRadius: theme?.borderRadius || 8,
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px',
      }}
    >
      {title && (
        <h3
          style={{
            margin: '0 0 20px 0',
            color: theme?.colorScheme === 'dark' ? '#ffffff' : '#000000',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      )}

      <form>
        {fields.map(renderField)}

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '24px',
          }}
        >
          <button
            type='button'
            style={{
              padding: '8px 16px',
              borderRadius: theme?.borderRadius || 4,
              border: `1px solid ${theme?.colorScheme === 'dark' ? '#444444' : '#dddddd'}`,
              backgroundColor: 'transparent',
              color: theme?.colorScheme === 'dark' ? '#dddddd' : '#666666',
              cursor: 'pointer',
            }}
          >
            {cancelLabel}
          </button>
          <button
            type='submit'
            style={{
              padding: '8px 16px',
              borderRadius: theme?.borderRadius || 4,
              border: 'none',
              backgroundColor: theme?.primaryColor || '#1677ff',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}
