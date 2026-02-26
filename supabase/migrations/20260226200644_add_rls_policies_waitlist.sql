-- Habilitar RLS en la tabla waitlist
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT a cualquier usuario anónimo (formulario público)
CREATE POLICY "allow_anon_insert"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Permitir SELECT a cualquier usuario anónimo (panel admin protegido por contraseña)
CREATE POLICY "allow_anon_select"
  ON waitlist FOR SELECT
  TO anon
  USING (true);