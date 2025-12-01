export default function InformationsPersonnelles({ formData, updateFormData }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-purple-800 mb-6">
        Informations personnelles
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prénom */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Prénom
          </label>
          <input
            type="text"
            value={formData.prenom}
            onChange={(e) => updateFormData('prenom', e.target.value)}
            placeholder="Jana"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
            required
          />
        </div>

        {/* Nom */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Nom
          </label>
          <input
            type="text"
            value={formData.nom}
            onChange={(e) => updateFormData('nom', e.target.value)}
            placeholder="Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="janadoe@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
          required
        />
      </div>

      {/* Numéro de téléphone */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Numéro de téléphone
        </label>
        <input
          type="tel"
          value={formData.telephone}
          onChange={(e) => updateFormData('telephone', e.target.value)}
          placeholder="123456789"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
          required
        />
      </div>

      {/* Adresse de livraison */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Adresse de livraison complète
        </label>
        <textarea
          value={formData.adresse}
          onChange={(e) => updateFormData('adresse', e.target.value)}
          placeholder="Rue,quartier,ville..."
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
          required
        />
      </div>

      {/* Rôle */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Rôle
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Enfant', 'Parent', 'Passionné du livre', 'Professionnel'].map((role) => (
            <label key={role} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={role}
                checked={formData.role === role}
                onChange={(e) => updateFormData('role', e.target.value)}
                className="w-5 h-5 text-yellow-500 focus:ring-2 focus:ring-yellow-400"
                required
              />
              <span className="text-gray-700">{role}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}